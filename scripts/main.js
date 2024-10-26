// 使用PDF.js来加载和显示PDF文档
var url = 'documents/math.pdf';

var pdfjsLib = window['pdfjs-dist/build/pdf'];
// 更新Worker脚本的路径
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@latest/build/pdf.worker.js';

var loadingTask = pdfjsLib.getDocument(url);
loadingTask.promise.then(function(pdf) {
    return pdf.getPage(1).then(function(page) {
        var scale = 1.5;
        var viewport = page.getViewport({ scale: scale });
        
        var canvas = document.getElementById('pdf-canvas');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        var renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        return page.render(renderContext).promise;
    });
}).catch(function(error) {
    console.error('Error loading PDF: ' + error);
});
