from __future__ import annotations

import argparse
from pathlib import Path

from CryptoLibrary.utils.cryptoutility import CryptoUtility


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Encrypt a single secret with CryptoLibrary.")
    parser.add_argument(
        "--text",
        required=True,
        help="Plain text value to encrypt.",
    )
    parser.add_argument(
        "--key-path",
        default=str(Path("tests") / "keys"),
        help="Directory where the public key file is stored.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    crypto = CryptoUtility(str(Path(args.key_path).resolve()))
    crypto.import_public_key_from_file()
    print(crypto.encrypt_text(args.text))


if __name__ == "__main__":
    main()
