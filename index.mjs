import { isString } from "./utils/isString.mjs";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export class YtDlp {
  _path = null;
  _options = {
    // sets the sorting of format list
    sort: null,

    // sets the output template
    output: null,

    // sets the output format for merged files
    outputFormat: null,

    // sets the format selection
    format: null,

    // sets the URL to download
    url: null,

    // built command
    build: null,
  };

  constructor(path = null) {
    this._path = path;
  }

  setPath(path) {
    isString(path);

    this._path = path;
    return this;
  }

  debug() {
    return this;
  }

  /*
   * same as using -S
   */
  sort(sortString) {
    isString(sortString);

    if (!this._options.sort) {
      this._options.sort = [];
    }

    this._options.sort.push(sortString);
    return this;
  }

  /*
   * same as using -o
   */
  output(outputString = null) {
    isString(outputString);

    this._options.output = outputString;
    return this;
  }

  /*
   * same as using --merge-output-format
   */
  outputFormat(formatString) {
    isString(formatString);

    this._options.outputFormat = formatString;
    return this;
  }

  /*
   * same as using -f
   */
  format(formatString) {
    isString(formatString);

    if (!this._options.format) {
      this._options.format = [];
    }

    this._options.format.push(formatString);
    return this;
  }

  /*
   * sets the URL to download
   */
  url(urlString) {
    isString(urlString);

    this._options.url = urlString;

    return this;
  }

  build(url = null) {
    const options = [];

    // add the provided binary or else just use yt-dlp
    options.push(this._path || "yt-dlp");

    // add the sort options
    if (this._options.sort) {
      options.push("-S", `'${this._options.sort.join(",")}'`);
    }

    // add output format
    if (this._options.outputFormat) {
      options.push("--merge-output-format", `'${this._options.outputFormat}'`);
    }

    // add format selection
    if (this._options.format) {
      options.push("-f", `'${this._options.format.join("/")}'`);
    }

    // add output path
    if (this._options.output) {
      options.push("-o", `'${this._options.output}'`);
    }

    // add the URL to download
    if (url) {
      isString(url);
      this.url(url);
    }

    if (this._options.url) {
      options.push(url);
    }

    this._options.build = options.join(" ");

    return this;
  }

  async exec(url = null) {
    this.build(url);

    await execAsync(this._options.build);
  }

  get command() {
    return this._options.build;
  }
}
