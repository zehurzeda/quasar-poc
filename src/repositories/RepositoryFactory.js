import AlmoxarifadoRepository from './almoxarifadoRepository'

const repositories = {
  almoxarifado: AlmoxarifadoRepository
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
