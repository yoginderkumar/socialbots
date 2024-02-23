require("dotenv").config();
module.exports = {
  creds: {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key:
      "=-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCZ0tKXoaOnFuwn\nCOL8QL3YUwG0swwEW5QGEcWxFSB8dzxh6wAjAmN3rOSsN6R3+tMcJFA+kXFGURFT\njhjzYAtUhODs/F7x6dfA080bUJlB/uAFFSNArsGC8LhCI2JDAcQMNCnUc6PhH1ch\n9c7IklmC2C3GeXIFDnIsy/3zC1fQ2mW9ek8cG93JEJ2mtwpvFwifhE/VFK3tD6CK\nNoU7lzqEhrkec442DsANHh+kf5mshnzwonllmbwrhYf5nh+tz2DHicre6PvvTRnU\nuQnSyOHbLqxLdXg1QZvi7oAwHKR/Z68p4Q9omUoyEP8S4osFQRIt1GVEq8t0uNgC\nvFhYLHrPAgMBAAECggEAPZ1Hw3r4fXZeE2io2xfns13UYhgR6TDxgtjdkgf/Yju0\nkRg7jspnI0m6swz6sSBkLXKSPe2uLNdOFGTns5y2DR3IpsSUF1xukouELbvEF75K\n515HJ6KYWqWneL6JnoN3jtfaJYJIk2UlVrIKKScN+a4z77s3o7TcoPr49sCFZV9m\nxczsIYM2846Iybn5k7+n6JyuM/a2z9urYanBViHBr78nK6Q4e0ZwYZcroaymaShL\n+D0LnN8PC58A9FpAop8+4QK+dGyOnE1XpdfFHKYa0mDz+u29afMUI4Cg8zDgRP6h\nd199uCoJEZVHwyzABFAkcXcAkhzwbghcfKW1uAFYIQKBgQDG1fPCTncQBNFYBAhQ\nhuqjq25Mni2WcHhoOc3bQEJvwigTf1S6OSV8AKx7QMc2GRSbbcfczTTZYVlpr/id\n9pII8oLK/T3RY5vy3V8gKn1ndJh5cZvyiNpLh5TPmsfDHKlMauy921KAUpW2vkQT\nQ0+UetYb/lDiaWSLqXMoC44LnwKBgQDGDAfDymcZKV7p9svBRbtfNPhZR4fbFj+Y\niK+1FySebnSKgNOtimnjb2bkrSFyUCipXRWS5JH64Vy0+2T1UTwZhigh4Bkyoadr\nkd4kAmQ74DnI+/wFfH80mNHNBZ4uiP323oCmKeVsF3RnbN4FEEeYCJAWkrBaJflM\nE1ywagpC0QKBgQCO9/ocxbSgpQYtxkCAPnJqmvJlTvsyh85cCuw08UCUAUQ1uMGg\nYUTNo+JhgVN8V45UsBwcbMTKZVAYSTp3wnqAync3I94WOAxDFd+3TjX7dH/KGuFq\nA/MKigN7PyzR40LsOpndbd0lfbw+uRJT03teJPDdEgDwu51bOs0dhylsuwKBgCmz\nzs7DiAIcXAgYF7+S12ms1b62+TyA6tNLtPQE84kI6TFg/zHDu5hQlPICItDXYDiJ\niUltJ/AUFFlntlKR0H3vafP4JFYtA/v6szQR7NlO1dwkc2UUWhTRORxa2nwiDJg3\nMg/LMqwYJELDAd0/GFRDOVQHf2r8JAqI6TOcoJyBAoGBAK28fn/VoJKlpTMp+RZ2\nOT5Yh7u7oq2EpDmuurzVDIBw1g1zA/yBBqxXOtNQvKP1fNXEsHXbFzFe7suwdaH7\nP+VR/Eh/VQbaGFGLQicbEwsdJ3P3xuOEgyjcbERhV5ngPA0PFIzQ3nX4HhYdrD8z\nQNpsh/Rq798Tn5+MZzhg7YD+\n-----END PRIVATE KEY-----\n",
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URL,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_AUTH_CERT_URL,
    universe_domain: "googleapis.com",
  },
};
