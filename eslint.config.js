// https://docs.expo.dev/guides/using-eslint/

/**
 * Importa a função `defineConfig` do pacote `eslint/config`.
 * Usada para definir a configuração do ESLint de forma estruturada.
 * @type {function(Array<object>): object}
 */
const { defineConfig } = require('eslint/config');
/**
 * Importa a configuração flat do ESLint fornecida pelo `eslint-config-expo`.
 * Esta configuração contém as regras e plugins recomendados para projetos Expo.
 * @type {object}
 */
const expoConfig = require('eslint-config-expo/flat');

/**
 * Exporta a configuração do ESLint.
 * Define as regras e configurações para o linting do projeto.
 * @module eslint.config
 * @type {object}
 * @property {Array<object>} - Um array de objetos de configuração do ESLint.
 */
module.exports = defineConfig([
  /**
   * Inclui a configuração padrão do Expo.
   */
  expoConfig,
  /**
   * Configurações adicionais específicas do projeto.
   */
  {
    /**
     * Padrões de arquivos e diretórios a serem ignorados pelo ESLint.
     * @type {Array<string>}
     */
    ignores: ['dist/*'],
  },
]);