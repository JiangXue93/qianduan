// console.log(process.argv.slice(2));
process.stdout.write('	'+process.cwd());
process.chdir('C:\\Users\\jiangxue\\Desktop');
console.log('');
process.stdout.write('	'+process.cwd());

console.log('');
console.log(process.env.NODE_ENV);
console.log(process.env.SHELL);