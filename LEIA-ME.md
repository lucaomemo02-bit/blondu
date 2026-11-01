# Blondu: app Android, app de computador e painel do administrador

Esta pasta tem tudo para gerar o Blondu como app, sem instalar nada no seu computador. O GitHub compila para você.

- `www/index.html`: o app (mesmo código da versão web)
- `build-apk.yml`: gera o APK do Android
- `build-desktop.yml`: gera os instaladores de computador (Windows, Mac e Linux)
- `config.json`: o arquivo que você edita para mudar o app para todo mundo (veja o final)

## 1. Colocar no GitHub

1. Crie uma conta grátis em github.com e clique em **New repository**. Nome sugerido: `blondu`. Crie como **Public** (precisa ser público para o painel funcionar, veja a parte 4).
2. Clique em **uploading an existing file** e envie **todo o conteúdo desta pasta** (arraste os arquivos e as pastas `www`, `assets`, `desktop` e `.github`). Clique em **Commit changes**.
3. Confira se existem `.github/workflows/build-apk.yml` e `.github/workflows/build-desktop.yml`. Se a pasta `.github` não subiu, clique em **Add file > Create new file**, digite `.github/workflows/build-apk.yml` no nome e cole o conteúdo de `build-apk.yml`. Repita para `build-desktop.yml`.

## 2. Gerar o APK (Android)

1. Abra a aba **Actions**. O processo **Gerar APK do Blondu** começa sozinho. Se não começar, clique nele e em **Run workflow**.
2. Espere 5 a 10 minutos. Se aparecer um X vermelho, abra a execução e me mande a mensagem de erro.
3. Na execução concluída, em **Artifacts**, baixe **Blondu-APK**, descompacte e passe o `app-debug.apk` para o celular. Autorize a instalação de fontes desconhecidas.

## 3. Gerar o app de computador

1. Em **Actions**, clique em **Gerar app de computador do Blondu** e em **Run workflow**.
2. Espere uns 10 minutos. Baixe em **Artifacts**:
   - **Blondu-windows-latest**: instalador `.exe` e versão portátil
   - **Blondu-macos-latest**: arquivo `.dmg`
   - **Blondu-ubuntu-latest**: arquivo `.AppImage`
3. O app do Mac e o do Windows não são assinados. O sistema pode mostrar um aviso de "desenvolvedor desconhecido". No Windows clique em **Mais informações > Executar assim mesmo**. No Mac, clique com o botão direito no app e escolha **Abrir**.

## 4. Painel do administrador (mudar o app para todos)

Entre no Blondu com o usuário **yobielx**. Em **Configurações** aparece **Painel do administrador**. Nele você define:

- aviso no topo do app para todos
- modo manutenção (bloqueia todo mundo menos você)
- aviso de nova versão, com link para baixar
- aparência padrão das contas novas
- **temas novos**: monte a aparência em Aparência e salve como tema. Ele aparece para todos
- liga e desliga do envio de imagens

Para valer para todos, siga estes passos uma vez:

1. No repositório do GitHub, abra `www/index.html`, clique no lápis e procure a linha `const REMOTE_URL='';`.
2. Troque por `const REMOTE_URL='https://raw.githubusercontent.com/SEU_USUARIO/blondu/main/config.json';` (troque `SEU_USUARIO` pelo seu usuário do GitHub) e salve. Isso gera um novo APK e um novo app de computador, e todos precisam instalar essa versão uma vez.
3. Daqui em diante, para mudar algo para todos: abra o painel, ajuste, clique em **Copiar config.json**, abra o `config.json` no GitHub, clique no lápis, cole e salve. Em poucos minutos todo mundo recebe, sem reinstalar.

Quem controla o app é quem consegue editar o repositório. Por isso mantenha a sua conta do GitHub com senha forte e verificação em duas etapas.

## Importante sobre os nomes e as contas

Hoje as contas, os servidores e as mensagens ficam salvos só no aparelho de cada pessoa. O Blondu bloqueia nomes reservados (admin, blondu, suporte...) e nomes parecidos com outro nome no mesmo aparelho, mas não consegue impedir que duas pessoas em aparelhos diferentes usem o mesmo nome. Isso só é possível com um servidor online que guarde as contas de todo mundo. Do mesmo jeito, conversar de verdade entre pessoas e moderar usuários (banir, apagar servidores) dependem desse servidor.

## Caminho alternativo: gerar no seu computador

Precisa de Node 20 ou superior, JDK 21 e Android Studio para o APK.

```
npm install
npx cap add android
npx capacitor-assets generate --android --iconBackgroundColor "#f2b441" --splashBackgroundColor "#0f0d17"
npx cap sync android
npx cap open android
```

No Android Studio, use **Build > Build APK(s)**. Para o app de computador: `cd desktop`, copie `www` para dentro de `desktop`, rode `npm install` e `npm run dist`.
