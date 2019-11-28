# SedTypeScript

## Usage

- Clone the repository
- Execute the command "npm install"
- Test some valid commands

## Valid Commands Examples

- ts-node sed.ts s/ubuntu/UBUNTU/ document.txt
- ts-node sed.ts s/ubuntu/UBUNTU/p document.txt
- ts-node sed.ts s/ubuntu/UBUNTU/pg document.txt
- ts-node sed.ts -e s/ubuntu/UBUNTU/g -e s/linux/UNIX/p document.txt -n
- ts-node sed.ts -e s/ubuntu/UBUNTU/ -e s/linux/UNIX/ -f sedCommands.txt document.txt
- ts-node sed.ts -e s/ubuntu/UBUNTU/ -e s/linux/UNIX/ -f sedCommands.txt document.txt -i
- ts-node sed.ts -e s/ubuntu/UBUNTU/ -e s/linux/UNIX/ -f sedCommands.txt document.txt -i .back

## Invalid Commands

- ts-node sed.ts -e s/ubuntu/UBUNTU -e s/linux/UNIX/ document.txt
- ts-node sed.ts -e s/ubuntu/UBUNTU/p/ -e s/linux/UNIX -f sedCommands.txt document.txt
- ts-node sed.ts -e s/ubuntu/UBUNTU/ -e s/linux/UNIX/ -f sedCommands.txt doc.txt
- ts-node sed.ts -e s/ubuntu/UBUNTU/ -e s/linux/UNIX/ -f sedCommands.txt document.txt -i ..back
- ts-node sed.ts -e s/ubuntu/UBUNTU/ -e s/linux/UNIX/ -f sedCommands.txt document.txt -i .back.
