const fs = require('fs').promises;
const path = require('path');

const folderPath = 'C:\\Users\\Даниил\\Downloads'; // Укажи путь к папке

async function getLastModifiedMp4() {
    try {
        // Получаем список файлов
        const files = await fs.readdir(folderPath);

        // Фильтруем только MP4 файлы
        const mp4Files = files.filter(file => file.toLowerCase().endsWith('.mp4'));

        if (mp4Files.length === 0) {
            console.log('Нет MP4 файлов в папке.');
            return null;
        }

        // Получаем информацию о файлах (без директорий)
        const filesWithStats = [];

        for (const file of mp4Files) {
            const filePath = path.join(folderPath, file);
            try {
                const stats = await fs.stat(filePath);
                if (stats.isFile()) {
                    filesWithStats.push({ file, mtime: stats.mtime });
                }
            } catch (err) {
                console.warn(`Не удалось получить информацию о файле: ${file}`, err.message);
            }
        }

        if (filesWithStats.length === 0) {
            console.log('Нет доступных MP4 файлов.');
            return null;
        }

        // Сортируем по дате изменения (самый новый — первый)
        filesWithStats.sort((a, b) => b.mtime - a.mtime);

        return folderPath+"\\"+filesWithStats[0].file;
    } catch (err) {
        console.error('Ошибка при получении файла:', err);
        return null;
    }
}
module.exports = {
    getLastModifiedMp4
}

