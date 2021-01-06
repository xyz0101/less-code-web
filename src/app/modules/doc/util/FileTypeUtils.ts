import { FileTypeConst } from "../const/FileTypeConst";

export class FileTypeUtils{
    
    static initType(){
        /**
         * office
         */
       FileTypeConst.words.forEach(item=>{
           FileTypeConst.FILE_TYPES.set(item,FileTypeConst.OFFICE_TYPE)
       })
       FileTypeConst.sheets.forEach(item=>{
        FileTypeConst.FILE_TYPES.set(item,FileTypeConst.OFFICE_TYPE)
        })
        FileTypeConst.ppts.forEach(item=>{
            FileTypeConst.FILE_TYPES.set(item,FileTypeConst.OFFICE_TYPE)
        })
        /**
         * image
         */
        FileTypeConst.images.forEach(item=>{
            FileTypeConst.FILE_TYPES.set(item,FileTypeConst.IMAGE_TYPE)
        })

         /**
         * vedio
         */
        FileTypeConst.videos.forEach(item=>{
            FileTypeConst.FILE_TYPES.set(item,FileTypeConst.VEDIO_TYPE)
        })

    }
    /**
     * 获取文件类型
     * @param suffix 文件后缀
     */
    static getFileType(suffix):string{
        suffix = suffix.replaceAll(".","")
        return FileTypeConst.FILE_TYPES.get(suffix);
    }
/**
     * 获取文件类型
     * @param fileName 文件名称
     */
    static getFileTypeByName(fileName):string{
        fileName=fileName.substring( fileName.lastIndexOf(".")+1);
        return FileTypeConst.FILE_TYPES.get(fileName);
    }

}