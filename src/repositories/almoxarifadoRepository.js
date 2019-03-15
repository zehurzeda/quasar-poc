import Repository from './Repository'

const resource = '/almoxarifado'

export default {
  get (filter = {}) {
    return Repository.get(`${resource}/pedido`, {
      params: filter
    })
  }
}
