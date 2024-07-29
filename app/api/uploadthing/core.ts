import { db } from "@/lib/db";
// import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { createUploadthing, type FileRouter } from "uploadthing/next";

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { getPineconeClient } from "@/lib/pinecone";
import { auth } from "@/auth";
// import { getUserSubscriptionPlan } from '@/lib/stripe'
// import { PLANS } from '@/config/stripe'

const f = createUploadthing();
// const freePagesLimit = PLANS.find((plan) => plan.name === 'Free')!
// .pagesPerPdf

const freePagesLimit = 20;
const proPagesLimit = 200;

const middleware = async () => {
  // const { getUser } = getKindeServerSession()
  const session = await auth();

  if (!session || !session.user) throw new Error("Unauthorized");
  const user = session.user;

  // const subscriptionPlan = await getUserSubscriptionPlan()

  const subscriptionPlan = {
    isSubscribed: false,
  };

  return { subscriptionPlan, userId: user.id };
};

const onUploadComplete = async ({
  metadata,
  file,
}: {
  metadata: Awaited<ReturnType<typeof middleware>>;
  file: {
    key: string;
    name: string;
    url: string;
  };
}) => {
  const isFileExist = await db.file.findFirst({
    where: {
      key: file.key,
    },
  });

  if (isFileExist) return;

  const createdFile = await db.file.create({
    data: {
      key: file.key,
      name: file.name,
      userId: metadata.userId,
      url: `https://utfs.io/f/${file.key}`,
      uploadStatus: "PROCESSING",
    },
  });

  console.log("createdFile.id is:", createdFile.id);

  try {
    const response = await fetch(`https://utfs.io/f/${file.key}`);

    const blob = await response.blob();

    const loader = new PDFLoader(blob);

    const pageLevelDocs = await loader.load();

    const pagesAmt = pageLevelDocs.length;
    console.log("pagesAmt is :", pagesAmt);

    const { subscriptionPlan } = metadata;
    const { isSubscribed } = subscriptionPlan;

    const isProExceeded = pagesAmt > proPagesLimit;
    const isFreeExceeded = pagesAmt > freePagesLimit;

    if ((isSubscribed && isProExceeded) || (!isSubscribed && isFreeExceeded)) {
      console.log("exceeded page amount");
      await db.file.update({
        data: {
          uploadStatus: "FAILED",
        },
        where: {
          id: createdFile.id,
        },
      });
    }

    console.log("connecting pinecone", pageLevelDocs);
    // vectorize and index entire document
    const pinecone = await getPineconeClient();
    const pineconeIndex = pinecone.Index("auth-master");
    console.log("start openai embedding");
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
    console.log("push to pinecone");

    // await pineconeIndex.upsert([{
    //   id: '1234',
    //   values: await embeddings.embedQuery(pageLevelDocs[0].pageContent),
    //   metadata: {
    //     genre: 'Gone with the Wind',
    //     runtime: 238,
    //     category: 'classic',
    //     namespace: createdFile.id,
    //   }

    // }])
    // console.log('pinecone inserted')
    await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
      pineconeIndex,
      namespace: createdFile.id,
    });
    console.log("success, save to db");
    await db.file.update({
      data: {
        uploadStatus: "SUCCESS",
      },
      where: {
        id: createdFile.id,
      },
    });
  } catch (err) {
    console.log(`Error happened while upload pdf: `, err);
    await db.file.update({
      data: {
        uploadStatus: "FAILED",
      },
      where: {
        id: createdFile.id,
      },
    });
  }
};

export const ourFileRouter = {
  freePlanUploader: f({ pdf: { maxFileSize: "4MB" } })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
  proPlanUploader: f({ pdf: { maxFileSize: "16MB" } })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
