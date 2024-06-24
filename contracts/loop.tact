import "@stdlib/deploy";

contract Loop with Deployable {
    count: Int as uint64 = 0;
    init() {
        
    }
    receive("loop"){
        let i: Int = 0;
        repeat(10){
            i += 1;
        }
        dump(i);
        self.count = i;
    }
    receive("loopWhile"){
        let i: Int = 0;

        while( i < 20){
            i += 1;
        }
        self.count = i;
        dump(i);
    }
        receive("doUntil"){
        let i: Int = 0;
        do{
            i += 1;
        }until(i >= 30);

        self.count = i;
        dump(i);
    }
    get fun count(): Int{
        return self.count;
    }
}
