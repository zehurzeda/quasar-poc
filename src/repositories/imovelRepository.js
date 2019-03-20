import Repository from './Repository'

const resource = '/imovel'

export default {
  get (idSetor, filter = {}) {
    return Repository.get(`${resource}/ocupacao-interna/${idSetor}`, {
      params: filter
    })
  }
}
