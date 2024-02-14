 class Test {
    public static void main(String args[]){
        String s2 = "abbcbba";
        char arr[] = s2.toCharArray();
        int i=0;
        for(i=0; i<=arr.length/2;i++){
            if(arr[i]!=arr[arr.length-1-i]){
                break;
            }
        }
        if(i>arr.length/2){
            System.out.println(i);
            System.out.println("Palindrom");
        }
        else{
            System.out.println("not palindrom");
        }
    }
}
