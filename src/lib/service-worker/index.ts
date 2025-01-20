import { onFetchServiceWorkerRequest, receiveMessageFromSandboxToServiceWorker } from './fetch';

(self as any as ServiceWorkerGlobalScope).oninstall = () =>
  (self as any as ServiceWorkerGlobalScope).skipWaiting();

(self as any as ServiceWorkerGlobalScope).onactivate = () =>
  (self as any as ServiceWorkerGlobalScope).clients.claim();

(self as any as ServiceWorkerGlobalScope).onmessage = receiveMessageFromSandboxToServiceWorker;

(self as any as ServiceWorkerGlobalScope).onfetch = onFetchServiceWorkerRequest;

const url = new URL(location.href);

if (url.searchParams.has('importScripts')) {
  const scripts = url.searchParams.get('importScripts')!.split(',');
  try {
    importScripts(...scripts);
  } catch (e: Error) {
    console.error(`error while importing scripts: ${e.message}`, e);
  }
}
