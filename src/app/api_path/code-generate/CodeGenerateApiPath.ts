export class CodeGenerateApiPath{
    /**
     * 获取数据库里面的所有表信息
     */
    public static LIST_DB_TABLES_PATH ="/lsc/code-generate/generate/listDbTables";
    /**
     * 创建表
     */
    public static CREATE_TABLE_PATH ="/lsc/code-generate/generate/createTable";
    /**
     * 获取还未创建的表信息
     */
    public static LIST_UNCREATE_TABLES_PATH ="/lsc/code-generate/generate/listUnCreateTables";
    /**
     * 生成代码
     */
    public static GENERATE_CODE_PATH ="/lsc/code-generate/generate/generateCode";
    /**
     * 获取数据库字段和java字段的映射关系
     */
    public static GET_TYPE_INFO_PATH ="/lsc/code-generate/generate/getTypeInfo";
    /**
     * 保存建表信息
     */
    public static SAVE_TABLE_INFO_PATH ="/lsc/code-generate/generate/saveTableInfo";
    /**
     * 下划线转驼峰
     */
    public static UNDERLINE_TO_CAMEL_PATH ="/lsc/code-generate/generate/underlineToCamel";
}