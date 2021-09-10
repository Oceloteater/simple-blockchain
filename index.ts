import { Chain } from './components/Chain';
import { Wallet } from './components/Wallet';

const satoshi = new Wallet();
const snake = new Wallet();
const ocelot = new Wallet();

satoshi.sendMoney(50, snake.publicKey);
snake.sendMoney(25, ocelot.publicKey);
ocelot.sendMoney(5, snake.publicKey);

console.log(Chain.instance);