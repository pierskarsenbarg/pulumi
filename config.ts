import * as pulumi from "@pulumi/pulumi";

let config = new pulumi.Config();
export const projectname = config.require('projectname');
