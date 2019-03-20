import Repository from './Repository'

const resource = '/orgao-setor'

export default {
  get (filter = {}) {
    return Repository.get(`${resource}/sistema/disponivel`, {
      params: filter
    })
  }
}
