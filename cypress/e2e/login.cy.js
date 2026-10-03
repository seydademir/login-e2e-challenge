describe('Login Form E2E Testleri', () => {
  beforeEach(() => {
    // Projenizi başlatırken kullandığınız yerel port (örn: 5173)
    cy.visit('http://localhost:5173');
  });

  it('a) Başarılı form doldurulduğunda submit edebiliyorum ve success sayfasını görebiliyorum', () => {
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('Password123!');
    cy.get('input[name="terms"]').check();

    cy.get('button[type="submit"]').should('not.be.disabled');
    cy.get('button[type="submit"]').click();

    cy.contains('Giriş Başarılı!').should('be.visible');
  });

  it('b) Hatalı durumlarda beklenen hata mesajları görünüyor ve buton disabled kalıyor', () => {
    // 1. Yanlış email senaryosu
    cy.get('input[name="email"]').type('gecersiz-email');
    cy.get('p.error').should('have.length', 1);
    cy.get('p.error').should('contain', 'Geçerli bir e-posta adresi giriniz.');
    cy.get('button[type="submit"]').should('be.disabled');

    // 2. Email ve Password ikisi de yanlış
    cy.get('input[name="password"]').type('123');
    cy.get('p.error').should('have.length', 2);
    cy.get('p.error').should('contain', 'Şifre en az 8 karakter');

    // 3. Email ve Password doğru ama şartlar kabul edilmedi
    cy.get('input[name="email"]').clear().type('test@example.com');
    cy.get('input[name="password"]').clear().type('Password123!');
    cy.get('input[name="terms"]').should('not.be.checked');
    cy.get('button[type="submit"]').should('be.disabled');
  });
});