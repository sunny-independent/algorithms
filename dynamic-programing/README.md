##Dynamic programing

Will use this startergy to devise an algorithm when the problem can be splitted into solutions of overlapping sub problems structure.Here we will solve the same sub problems again and agian to reach the final solution.

If the sub problems are non over lapping then we should use Divide and Conquer startergy.


#Tail call recursion

Current javascript version is not supporting the tail call recursion. Hence this will lead to MAX STACK reached exception when we run against a large set of data.

#Problem Statement

Alice is a kindergarden teacher. She wants to give some candies to the children in her class.  All the children sit in a line ( their positions are fixed), and each  of them has a rating score according to his or her performance in the class.  Alice wants to give at least 1 candy to each child. If two children sit next to each other, then the one with the higher rating must get more candies. Alice wants to save money, so she needs to minimize the total number of candies given to the children.

#Input Format

The first line of the input is an integer N, the number of children in Alice's class. Each of the following N lines contains an integer that indicates the rating of each child.

1 <= N <= 105 
1 <= ratingi <= 105

#Output Format

Output a single line containing the minimum number of candies Alice must buy.

Sample Input

3  
1  
2  
2
#Sample Output

4
#Explanation

Here 1, 2, 2 is the rating. Note that when two children have equal rating, they are allowed to have different number of candies. Hence optimal distribution will be 1, 2, 1.