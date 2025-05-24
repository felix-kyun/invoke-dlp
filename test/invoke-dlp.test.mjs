import { strictEqual } from "assert";
import { InvokeDlp } from "../index.mjs";
import { beforeEach, describe, it } from "node:test";

describe("InvokeDlp Test", () => {
  let ytDlp;

  beforeEach(() => {
    ytDlp = new InvokeDlp();
  });

  it("should include the format sort options", () => {
    const buildCommand = ytDlp
      .sort("res:1080")
      .sort("filesize")
      .build().command;
    const expectedSort = "-S 'res:1080,filesize'";
    strictEqual(buildCommand.includes(expectedSort), true);
  });

  it("should include the output format options", () => {
    const buildCommand = ytDlp.outputFormat("mp4").build().command;
    const expectedSort = "--merge-output-format 'mp4'";
    strictEqual(buildCommand.includes(expectedSort), true);
  });

  it("should include the output options", () => {
    const buildCommand = ytDlp.output("video.mp4").build().command;
    const expectedOutput = "-o 'video.mp4'";
    strictEqual(buildCommand.includes(expectedOutput), true);
  });

  it("should include the format options", () => {
    const buildCommand = ytDlp
      .format("bestvideo[height<=1080][filesize<100M]+bestaudio")
      .build().command;
    const expectedFormat =
      "-f 'bestvideo[height<=1080][filesize<100M]+bestaudio'";
    strictEqual(buildCommand.includes(expectedFormat), true);
  });

  it("should include the URL", () => {
    const buildCommand = ytDlp
      .url("https://www.youtube.com/watch?v=8zUL1X88rTQ")
      .build().command;

    const expectedUrl = "https://www.youtube.com/watch?v=8zUL1X88rTQ";
    strictEqual(buildCommand.includes(expectedUrl), true);
  });

  it("should include the path if set", () => {
    const ytDlpWithPath = new InvokeDlp("/path/to/yt-dlp");
    const buildCommand = ytDlpWithPath.build().command;
    strictEqual(buildCommand.includes("/path/to/yt-dlp"), true);
  });

  it("should build the expected command", () => {
    const buildCommand = ytDlp
      .sort("res:1080")
      .sort("filesize")
      .format("bestvideo[height<=1080][filesize<100M]+bestaudio")
      .format("best[height<=1080][filesize<100M]")
      .output("%(title)s.%(ext)s")
      .outputFormat("mp4")
      .url("https://www.youtube.com/watch?v=8zUL1X88rTQ")
      .build().command;

    strictEqual(buildCommand.includes("-S 'res:1080,filesize'"), true);
  });
});
