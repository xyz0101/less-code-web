export class ButtonCodes {
    /**
     * 按钮权限代码，注意唯一性
     */
    buttonCodes = {

        codegenerator: {
            addTable: "ADD_TABLE",

            generateCode: "GENERATE_CODE",

        },

        user: {
            addUser: "ADD_USER",
            deleteUser: 'DELETE_USER'
        }

    }

    hasPermission(code):boolean{
        console.log(code)
        return true
    }

}