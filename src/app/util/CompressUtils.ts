
export class CompressUtils{

    public static base64ToBlob(urlData, type) {
        let arr = urlData.split(',');
        let mime = arr[0].match(/:(.*?);/)[1] || type;
        // 去掉url的头，并转化为byte
        let bytes = window.atob(arr[1]);
        // 处理异常,将ascii码小于0的转换为大于0
        let ab = new ArrayBuffer(bytes.length);
        // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
        let ia = new Uint8Array(ab);
        for (let i = 0; i < bytes.length; i++) {
          ia[i] = bytes.charCodeAt(i);
        }
        return new Blob([ab], {
          type: mime
        });
    }
     
    public static  compressImg(file,type){
        return new Promise<any>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            const name = file.name;
            reader.onload = (e) => {
                const dataURL = (e.target as any).result;
                // 图片小于2M不压缩
                if (file.size < Math.pow(1024, 2) * 0.5) {
                    console.log('图片小于0.5M 不进行压缩');
                    resolve(file);
                    return;
                }
                const img: any = new Image;
                img.src = dataURL, img.onload = function () {
                    const w = img.width / 2, // 宽度
                        h = img.height / 2,
                        cvs = document.createElement("canvas"),
                        o = cvs.getContext("2d");
                    cvs.setAttribute("width", w + ''), cvs.setAttribute("height", h + ''), o.drawImage(this, 0, 0, w, h);
                    const i = cvs.toDataURL(type, CompressUtils.getPoint(file.size/(1024*1024))); // 压缩质量为 0.8  数值越小 压缩的图片越模糊 取值区间为 0 - 1
                    const _file: any = CompressUtils.base64ToBlob(i,type);
                    _file.name = name;
                    let res = new  window.File([_file], name, {type: type});
                    
                    resolve(res);
                }
            }
     
        })
     
    }

    private static getPoint(length):number{
        if(length<1){
            return 1
        }else if(length>1&&length<5){
            return 0.5
        }else{
            return 0.2
        }
    }
}
