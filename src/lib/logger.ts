class Logger{
    constructor(){}

    public info(log: string) {
        console.log(`[[ INFO ☘️ == ${log} ]]`)
    }
    public error(error: string){
        console.log(`[[ Error💥== ${error} ]]`)
    }
} 

export const logger = new Logger()
