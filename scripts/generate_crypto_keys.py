from __future__ import annotations

import argparse
from pathlib import Path

from CryptoLibrary.utils.cryptoutility import CryptoUtility


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate CryptoLibrary key material.")
    parser.add_argument(
        "--key-path",
        default=str(Path("tests") / "keys"),
        help="Directory where private and public key files will be stored.",
    )
    parser.add_argument(
        "--password",
        required=True,
        help="Password used to protect the private key file.",
    )
    parser.add_argument(
        "--save-password-hash",
        action="store_true",
        help="Also store the password hash in password_hash.json.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    key_path = Path(args.key_path).resolve()
    key_path.mkdir(parents=True, exist_ok=True)

    crypto = CryptoUtility(str(key_path))
    crypto.generate_key_pair()
    crypto.password = args.password

    private_key_path = crypto.export_private_key_to_file()
    public_key_path = crypto.export_public_key_to_file()

    print(f"Private key written to: {private_key_path}")
    print(f"Public key written to: {public_key_path}")

    if args.save_password_hash:
        password_hash_path = crypto.export_password_hash_to_file()
        print(f"Password hash written to: {password_hash_path}")


if __name__ == "__main__":
    main()
