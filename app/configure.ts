
export class Configure {
  url: string

  constructor() { 
    this.url = 'http://localhost:3000'
  }
  getUrl() {
    return this.url
  }
}