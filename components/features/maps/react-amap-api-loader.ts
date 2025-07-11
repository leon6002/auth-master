/// <reference path="../node_modules/@uiw/react-amap-types/index.d.ts" />
"use client"
import { ComponentType, PropsWithChildren } from 'react';
import dynamic from 'next/dynamic';
import { APILoaderProps } from '@uiw/react-amap';

export const APILoader: ComponentType<PropsWithChildren<APILoaderProps>> = dynamic(
  () => import('@uiw/react-amap-api-loader').then((mod: any) => mod.APILoader),
  { ssr: false },
);