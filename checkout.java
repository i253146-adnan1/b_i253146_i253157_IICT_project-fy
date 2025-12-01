public class EcothreadCheckout extends JFrame {
    
    public EcothreadCheckout() {
        setTitle("Ecothread Checkout");
        setSize(600, 650);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        
        JPanel p = new JPanel();
        p.setLayout(new BoxLayout(p, BoxLayout.Y_AXIS));
        
        JLabel h = new JLabel("🍃 Ecothread");
        h.setFont(new Font("Arial", Font.BOLD, 30));
        h.setOpaque(true);
        h.setBackground(new Color(144, 238, 144));
        
        JLabel t = new JLabel("<html><br>Checkout<br><br>Payment (Paypal, credit) ●<br><br>" +
                              "🛍️ $48.0    👜 $38.0<br><br>" +
                              "Subtotal: $86.0<br>Tax: 5%<br><b>GRAND TOTAL: $90.3</b></html>");
        t.setFont(new Font("Arial", Font.PLAIN, 18));
        
        JButton b = new JButton("Place Order");
        b.setFont(new Font("Arial", Font.BOLD, 18));
        b.setBackground(new Color(150, 180, 255));
        
        JLabel f = new JLabel("📷 Instagram  📘 Facebook  |  Contact: ecothread@gmail.com");
        f.setOpaque(true);
        f.setBackground(new Color(144, 238, 144));
        
        p.add(h);
        p.add(t);
        p.add(b);
        p.add(Box.createVerticalStrut(20));
        p.add(f);
        
        add(p);
        setVisible(true);
    }
    
    public static void main(String[] args) {
        new EcothreadCheckout();
    }
}