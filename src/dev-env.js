import { Blob } from "buffer";
import Streams from "stream/web";
import { webcrypto as crypto } from "crypto";
import { TextEncoder, TextDecoder } from "util";
import { fetch, File, FormData, Headers, Request, Response } from "undici";
import { KVNamespace } from "@miniflare/kv";
import { MemoryStorage } from "@miniflare/storage-memory";
const STORAGE = new KVNamespace(new MemoryStorage());

// Expose similar globals to what is available in a worker.
Object.assign(globalThis, Streams, {
  Blob,
  crypto,
  EventTarget,
  fetch,
  File,
  FormData,
  Headers,
  Request,
  Response,
  STORAGE,
  TextDecoder,
  TextEncoder
});
