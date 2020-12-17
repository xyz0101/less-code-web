
export class CompressUtils{

    public static  dataURLtoBlob (dataurl)  {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }
     
    public static  compressImg(file){
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);
            const name = file.name;
            reader.onload = (e) => {
                const dataURL = (e.target as any).result;
                // 图片小于2M不压缩
                if (file.size < Math.pow(1024, 2) * 2) {
                    console.log('图片小于2m 不进行压缩');
                    resolve({base64: dataURL, file: file});
                    return;
                }
                const img: any = new Image;
                img.src = dataURL, img.onload = function () {
                    const w = img.width / 2, // 宽度
                        h = img.height / 2,
                        cvs = document.createElement("canvas"),
                        o = cvs.getContext("2d");
                    cvs.setAttribute("width", w + ''), cvs.setAttribute("height", h + ''), o.drawImage(this, 0, 0, w, h);
                    const i = cvs.toDataURL("image/jpeg", 0.8); // 压缩质量为 0.8  数值越小 压缩的图片越模糊 取值区间为 0 - 1
                    const _file: any = CompressUtils.dataURLtoBlob(i);
                    _file.name = name;
                    resolve({
                        base64: i,
                        file: _file
                    });
                }
            }
     
        })
     
    }
}
