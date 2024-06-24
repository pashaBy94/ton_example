import "@stdlib/deploy";

extends fun sum(self: Int, b: Int): Int{
        return self + b; 
}
extends mutates fun sumMut(self: Int, v: Int){
    self = self + v; 
}
contract SympleContract with Deployable {
    num: Int as uint32;
    init() {
        self.num = 43;
    }
    get fun num(): Int{
        return self.num.sum(44); //87
    }
    get fun numMut(){
        self.num.sum(44); // num = 87
    }
    receive(){

    }
    fun setId(): Int{
        return 2222;
    }
}
