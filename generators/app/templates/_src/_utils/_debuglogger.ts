class DebugLogger {
    /**
     * This method logs the starting of any function execution. It also logs the parameter passed to the function.
     */
    public static debugLogStart(methodName: string, param?: any) {
        if (param) {
            console.log(`${methodName}: execution started! Parameters passed ${JSON.stringify(param)}`);
        }
        else {
            console.log(`${methodName}: execution started!`);
        }
    }

    /**
     * This method logs the ending of any function execution.
     */
    public static debugLogEnd(methodName: string) {
        console.log(`${methodName}: execution ened!`);
    }
}

export default DebugLogger;