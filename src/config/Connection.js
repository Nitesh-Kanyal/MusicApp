'use strict';

const songsApi = 'https://itunes.apple.com/';

const running_urlOne = songsApi;

export default class Connection {
  static getResturl() {
    return running_urlOne;
  }
}
