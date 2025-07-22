#!/usr/bin/env node

/**
 * Este script é usado para redefinir o projeto para um estado em branco.
 * Ele exclui ou move os diretórios /app, /components, /hooks, /scripts e /constants para /app-example
 * com base na entrada do usuário e cria um novo diretório /app com um arquivo index.tsx e _layout.tsx.
 * Você pode remover o script `reset-project` de package.json e excluir este arquivo com segurança depois de executá-lo.
 * @module reset-project
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

/**
 * O diretório raiz do projeto.
 * @type {string}
 */
const root = process.cwd();
/**
 * Lista de diretórios antigos a serem movidos ou excluídos.
 * @type {string[]}
 */
const oldDirs = ["app", "components", "hooks", "constants", "scripts"];
/**
 * Nome do diretório de exemplo para onde os arquivos antigos serão movidos.
 * @type {string}
 */
const exampleDir = "app-example";
/**
 * Nome do novo diretório 'app' a ser criado.
 * @type {string}
 */
const newAppDir = "app";
/**
 * Caminho completo para o diretório de exemplo.
 * @type {string}
 */
const exampleDirPath = path.join(root, exampleDir);

/**
 * Conteúdo padrão para o arquivo `index.tsx` do novo diretório `app`.
 * @type {string}
 */
const indexContent = `import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
`;

/**
 * Conteúdo padrão para o arquivo `_layout.tsx` do novo diretório `app`.
 * @type {string}
 */
const layoutContent = `import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
`;

/**
 * Interface para leitura de linha do console.
 * @type {readline.Interface}
 */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Move os diretórios antigos para o diretório de exemplo ou os exclui,
 * e então cria um novo diretório 'app' com arquivos padrão.
 * @param {string} userInput - A resposta do usuário ('y' para mover, 'n' para excluir).
 * @returns {Promise<void>}
 */
const moveDirectories = async (userInput) => {
  try {
    if (userInput === "y") {
      // Cria o diretório app-example
      await fs.promises.mkdir(exampleDirPath, { recursive: true });
      console.log(`📁 /${exampleDir} directory created.`);
    }

    // Move os diretórios antigos para o novo diretório app-example ou os exclui
    for (const dir of oldDirs) {
      const oldDirPath = path.join(root, dir);
      if (fs.existsSync(oldDirPath)) {
        if (userInput === "y") {
          const newDirPath = path.join(root, exampleDir, dir);
          await fs.promises.rename(oldDirPath, newDirPath);
          console.log(`➡️ /${dir} moved to /${exampleDir}/${dir}.`);
        } else {
          await fs.promises.rm(oldDirPath, { recursive: true, force: true });
          console.log(`❌ /${dir} deleted.`);
        }
      } else {
        console.log(`➡️ /${dir} does not exist, skipping.`);
      }
    }

    // Cria o novo diretório /app
    const newAppDirPath = path.join(root, newAppDir);
    await fs.promises.mkdir(newAppDirPath, { recursive: true });
    console.log("\n📁 New /app directory created.");

    // Cria index.tsx
    const indexPath = path.join(newAppDirPath, "index.tsx");
    await fs.promises.writeFile(indexPath, indexContent);
    console.log("📄 app/index.tsx created.");

    // Cria _layout.tsx
    const layoutPath = path.join(newAppDirPath, "_layout.tsx");
    await fs.promises.writeFile(layoutPath, layoutContent);
    console.log("📄 app/_layout.tsx created.");

    console.log("\n✅ Project reset complete. Next steps:");
    console.log(
      `1. Run \`npx expo start\` to start a development server.\n2. Edit app/index.tsx to edit the main screen.${userInput === "y" ? `\n3. Delete the /${exampleDir} directory when you're done referencing it.` : ""}`
    );
  } catch (error) {
    console.error(`❌ Error during script execution: ${error.message}`);
  }
};

/**
 * Pergunta ao usuário se ele deseja mover os arquivos existentes para /app-example ou excluí-los.
 * Com base na resposta, chama a função `moveDirectories`.
 */
rl.question(
  "Do you want to move existing files to /app-example instead of deleting them? (Y/n): ",
  (answer) => {
    const userInput = answer.trim().toLowerCase() || "y";
    if (userInput === "y" || userInput === "n") {
      moveDirectories(userInput).finally(() => rl.close());
    } else {
      console.log("❌ Invalid input. Please enter 'Y' or 'N'.");
      rl.close();
    }
  }
);