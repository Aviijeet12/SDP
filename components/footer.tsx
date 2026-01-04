import Link from "next/link"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-4">BlockChain Trust</h3>
            <p className="text-sm text-muted-foreground">
              Enterprise blockchain platform for digital trust and secure automation.
            </p>
          </div>

          {/* Links */}
          {[
            {
              title: "Product",
              links: ["Features", "Security", "Pricing", "Templates"],
            },
            {
              title: "Resources",
              links: ["Documentation", "Blog", "Support", "Status"],
            },
            {
              title: "Company",
              links: ["About", "Team", "Careers", "Contact"],
            },
          ].map((col, idx) => (
            <div key={idx}>
              <h4 className="font-semibold mb-4 text-foreground">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground">© 2025 Blockchain Trust Platform. All rights reserved.</p>

          <div className="flex gap-4">
            {[Github, Twitter, Linkedin, Mail].map((Icon, idx) => (
              <Link
                key={idx}
                href="#"
                className="p-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all hover:shadow-lg hover:shadow-primary/30"
              >
                <Icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
