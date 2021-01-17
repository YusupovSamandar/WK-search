1. Что бы понять, как утроена связка Django+React+Bootastrap
для начала развернуть и всё настроить по этой статье:
[1] https://tproger.ru/translations/django-react-webapp/

2. Далее начинаем разбираться с Reactom. Очень хорошая документация
с погружением в понимание самого React и JSX. Документация по React:
[2] https://ru.reactjs.org/docs/hello-world.html

3. С Bootstrap всё проще, так как он используется,
как компоненты React:
[3] https://reactstrap.github.io

4. Могут возникнуть проблемы с подключением bootstrap.min.css,
для этого неоюходимо установить loader для webpack.js:
[4.1] npm install --save-dev css-loader
[4.2] добавить в webpack.config.js:
{
    test: /\.css$/i,
    use: ['style-loader', 'css-loader'],
},
Добавить сюда:
module.exports = {
  module: {
    rules: [
      ...
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      ...
    ],
  }
};

5. Для сборки App.js через VS Code содержимое .vscode/launch.json:
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch via npm",
            "runtimeExecutable": "npm",
            "runtimeArgs": ["run-script", "dev"]
        }
    ]
}
