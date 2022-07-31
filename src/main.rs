use std::io::stdin;

fn main() {
    println!("Hello, world!");

    let mut input_str = String::new();
    stdin().read_line(&mut input_str).unwrap();
    println!("{}", input_str);
}
