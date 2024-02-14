import java.util.Scanner;

public class Armstrong {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number ");
        int num = sc.nextInt();
        int originalNum = num;
        int mainNumber = num;
        int count = 0;
        while (num>0) {
            num = num/10;
            count++;
        }
        System.out.println(count);
        double sum = 0;
            while (mainNumber>0) {
                double reminder = mainNumber%10;
                sum = sum + Math.pow(count, reminder);
            }
            if(originalNum==sum){
                System.out.println("armstrong");
            }
            else
            System.out.println(("not armstrong"));
            System.out.println("end");
    }
}
