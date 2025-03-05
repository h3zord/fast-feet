import { ValueObject } from '@/core/entities/value-object'

interface CpfProps {
  value: string
}

export class Cpf extends ValueObject<CpfProps> {
  get value() {
    return this.props.value
  }

  public static create(props: CpfProps) {
    if (!this.isCPFValid(props.value)) {
      throw new Error('Invalid CPF')
    }

    const cpf = new Cpf(props)

    return cpf
  }

  /**
   * Valida um CPF brasileiro.
   * @param cpf - CPF a ser validado (aceita string formatada ou não)
   * @returns Retorna um booleano indicando se o CPF é válido ou não.
   */
  private static isCPFValid(cpf: string) {
    const cleanedCPF = cpf.replace(/\D/g, '')

    if (cleanedCPF.length !== 11) return false

    if (/^(\d)\1{10}$/.test(cleanedCPF)) return false

    const firstDigit = this.calculateDigit(cleanedCPF.slice(0, 9))
    const secondDigit = this.calculateDigit(cleanedCPF.slice(0, 9) + firstDigit)

    return (
      firstDigit === parseInt(cleanedCPF[9]) &&
      secondDigit === parseInt(cleanedCPF[10])
    )
  }

  /**
   * Calcula um dígito verificador do CPF.
   * @param base - Primeiros 9 ou 10 dígitos do CPF.
   * @returns O dígito verificador calculado.
   */
  private static calculateDigit(base: string) {
    let sum = 0

    for (let i = 0; i < base.length; i++) {
      sum += parseInt(base[i]) * (base.length + 1 - i)
    }

    const rest = (sum * 10) % 11

    return rest === 10 ? 0 : rest
  }
}
