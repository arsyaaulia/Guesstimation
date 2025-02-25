import java.util.Scanner;

public class Guesstimation {
    public static void main(String[] args){
        Scanner input = new Scanner(System.in);

        //Menu
        System.out.println("Welcome to Guesstimation!");
        System.out.println("Menu");
        System.out.println("1. Easy (1-10) : ");
        System.out.println("2. Medium (1-50) :");
        System.out.println("3. Hard (1-100) : ");
        System.out.print("Please select level : ");
        int level = input.nextInt();
        //int attempts = 0;

        //set the maxnumber and score for each level
        int maxnumber;
        int score;

        switch (level) {
            case 1 -> {
                maxnumber = 10;
                score = 100;
            }
            case 2 -> {
                maxnumber = 50;
                score = 200;
            }
            case 3 -> {
                maxnumber = 100;
                score = 300;
            }
            default -> {
                maxnumber = 10;
                score = 100;
            }
        };

        int numberToGuess = (int) (Math.random() * maxnumber) +1;
        int attempts =0;

        System.out.println("\nGuess a number between 1 -" + maxnumber);

        while(true) {
            System.out.print("Enter your guess: ");
            int userGuess = input.nextInt();
            attempts++;

            if (userGuess < numberToGuess) {
                System.out.println("Too low! Try again.");
            }
            else if (userGuess > numberToGuess) {
                System.out.println("Too high! Try again.");
            }
            else {
                System.out.println("Congratulations! You guessed the number in " +attempts+ " attempts.");
                break;
            }

            score -= 10;
        }

        System.out.println("Your score: " + Math.max(score, 0));

        input.close();
    }
}