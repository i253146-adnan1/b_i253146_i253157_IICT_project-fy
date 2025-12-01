public class Ecothread {

    private String brandName = "Ecothread";
    private String contactEmail = "ecothread@gmail.com";
    private String phone = "+1 555-123-4567";
    private String address = "123 Greenway Blvd, Portland, OR";

    public void showContactPage() {
        System.out.println("====== " + brandName + " ======");
        System.out.println("[Search Button]\n");

        System.out.println("Contact Us\n");
        System.out.println("Email: " + contactEmail);
        System.out.println("Phone: " + phone);
        System.out.println("Address: " + address + "\n");

        System.out.println("FAQ Section\n");

        System.out.println("------ Footer ------");
        System.out.println("[Instagram] [Facebook]");
        System.out.println("About us");
        System.out.println("FAQ");
        System.out.println("Privacy\n");
    }

    public static void main(String[] args) {
        Ecothread page = new Ecothread();
        page.showContactPage();
    }
}
