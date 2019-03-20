import AlmoxarifadoRepository from './almoxarifadoRepository'
import SetorRepository from './setorRepository'
import ImovelRepository from './imovelRepository'
import FuncionarioRepository from './funcionarioRepository'

const repositories = {
  almoxarifado: AlmoxarifadoRepository,
  setor: SetorRepository,
  imovel: ImovelRepository,
  funcionario: FuncionarioRepository
}

export const RepositoryFactory = {
  get: name => repositories[name]
}
