import javax.swing.*;
import java.awt.*;

public class Ecothread extends JFrame {
    
    public Ecothread() {
        setTitle("Ecothread");
        setSize(600, 700);
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        
        JPanel main = new JPanel();
        main.setLayout(new BoxLayout(main, BoxLayout.Y_AXIS));
        
        // Header
        JLabel header = new JLabel("🍃 Ecothread");
        header.setFont(new Font("Arial", Font.BOLD, 35));
        header.setOpaque(true);
        header.setBackground(new Color(144, 238, 144));
        
        // Content
        JLabel title = new JLabel("<html><center>About Us<br><br>Description</center></html>");
        title.setFont(new Font("Arial", Font.BOLD, 30));
        
        JLabel desc = new JLabel("<html><center>Ecothread offers eco friendly products like tote bags,<br>" +
                                 "laptop sleeves, pencils, pouches and cushion covers<br>" +
                                 "made from one time used clothes by local women artisans.<br><br>" +
                                 "Every item is unique, water resistant, helping protect the environment.</center></html>");
        desc.setFont(new Font("Arial", Font.PLAIN, 14));
        
        JLabel team = new JLabel("The team of Ecothread");
        team.setFont(new Font("Arial", Font.BOLD, 22));
        
        // Footer
        JLabel footer = new JLabel("📷 Instagram  📘 Facebook  |  Contact: ecothread@gmail.com");
        footer.setFont(new Font("Arial", Font.PLAIN, 13));
        footer.setOpaque(true);
        footer.setBackground(new Color(144, 238, 144));
        
        main.add(header);
        main.add(Box.createVerticalStrut(30));
        main.add(title);
        main.add(Box.createVerticalStrut(20));
        main.add(desc);
        main.add(Box.createVerticalStrut(40));
        main.add(team);
        main.add(Box.createVerticalStrut(50));
        main.add(footer);
        
        add(main);
        setVisible(true);
    }
    
    public static void main(String[] args) {
        new Ecothread();
    }
}