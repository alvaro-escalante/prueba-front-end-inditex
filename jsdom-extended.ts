// Jest environment extended para tranbajar con MSW
import { TestEnvironment } from 'jest-environment-jsdom';
import { EnvironmentContext, JestEnvironmentConfig } from '@jest/environment';

class JSDOMEnvironmentExtended extends TestEnvironment {
  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context);

    this.global.ReadableStream = ReadableStream;
    this.global.TextDecoder = TextDecoder;
    this.global.TextEncoder = TextEncoder;

    this.global.Blob = Blob;
    this.global.File = File;
    this.global.Headers = Headers;
    this.global.FormData = FormData;
    this.global.Request = Request;
    this.global.Response = Response;
    this.global.fetch = fetch;
    this.global.structuredClone = structuredClone;
  }
}

export default JSDOMEnvironmentExtended;
