import Repository from './Repository'

const resource = '/funcionario'

export default {
  get (idSetor, filter = {}) {
    return Repository.get(`${resource}/disponivel`, {
      params: filter
    })
  }
}
