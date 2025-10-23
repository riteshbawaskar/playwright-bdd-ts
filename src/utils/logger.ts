export class Logger {
  static info(message: string): void {
    console.log(`ℹ️  ${message}`);
  }

  static success(message: string): void {
    console.log(`✅ ${message}`);
  }

  static error(message: string): void {
    console.log(`❌ ${message}`);
  }

  static warning(message: string): void {
    console.log(`⚠️  ${message}`);
  }

  static step(message: string): void {
    console.log(`   ➤ ${message}`);
  }

  static result(message: string): void {
    console.log(`   ✓ ${message}`);
  }

  static separator(): void {
    console.log('='.repeat(80));
  }

  static section(title: string): void {
    this.separator();
    console.log(title);
    this.separator();
  }
}
