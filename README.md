# wks-react

1. Обновить launch.json из папки deploy
2. npm install
3. Запустить django на :8000
4. Руками в терминале запустить npm start - запустится webpack dev server
    4.1 Только для Windows:
        cp ./deploy/example.npm_start.bat ./npm_start.bat
        cmd.exe ./npm_start.bat (! Не PowerShell !)
5. F5 - запустится хром по конфигурации из launch.json
6. PROFIT: можно ставить брейкпоинты в vscode, смотреть значения переменных и в реальном времени менять код без перезагрузки чего-либо