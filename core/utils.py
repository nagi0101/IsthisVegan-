from uuid import uuid4


def upload_to_uuid(instance, filename):
    uuid_name = uuid4().hex
    ext = filename.split(".")[-1]

    return "/".join(
        [
            uuid_name[:2],
            uuid_name[2:4],
            uuid_name[4:] + ext,
        ]
    )
