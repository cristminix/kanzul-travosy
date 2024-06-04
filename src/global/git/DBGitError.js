class DBGitError {
  static GET_DATA_FAILED = 1

  constructor(dbInstance) {
    this.dbInstance = dbInstance
  }

  report(errorCode, errorReason) {
    const errorMessage = `DBGitError:${this.dbInstance.type}:(${errorCode}) : ${errorReason}`
    console.log(errorMessage)
    alert(`${errorMessage}`)
  }
}

export default DBGitError
