export class FileTypeConst{
     /**
         * ************
         * ***office***
         * ************
         */
        public static words = ["doc","docx","docm","dot","dotx","dotm","odt","fodt",
        "ott","rtf","txt","html","htm","mht","pdf","djvu","fb2","epub","xps"]
        public static sheets =["xls","xlsx","xlsm","xlt","xltx","xltm","ods","fods","ots","csv"];
        public static ppts = ["pps","ppsx","ppsm","ppt","pptx","pptm","pot","potx","potm","odp","fodp","otp"];
         /**
         * *************
         * ***图片格式***
         * *************
         */
        public static images = ["bmp","jpg","jpeg","png","tif","gif","pcx","tga","exif","fpx","svg","psd","cdr",
        "pcd","dxf","ufo","eps","ai","raw","WMF","webp","avif"];
        /**
         * *************
         * ***视频格式***
         * *************
         */
        public static videos = ["flv","mp4","avi","wmv","mpg","mov","mkv","f4v","m4v","rmvb","rm","3gp"];


    /**
     * office文件类型
     */
    public static OFFICE_TYPE = 'office';
    /**
     * 图片类型
     */
    public static IMAGE_TYPE = 'image';
    /**
     * 视频类型
     */
    public static VEDIO_TYPE = 'vedio';

    public static FILE_TYPES = new Map(); 











}