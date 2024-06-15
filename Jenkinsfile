pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'hixej84931fna6/nodejs_exp:latest'
        registryCredential = credentials('docker-hub-config')
        // KUBECONFIG = '/home/xs309-shusai/Downloads/sahil-config'
        KUBECONFIG = credentials('kubeconfig-credential')

    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    def dockerCmd = isUnix() ? 'docker' : 'docker.exe'
                    sh "${dockerCmd} build -t ${DOCKER_IMAGE} ."
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    def dockerCmd = isUnix() ? 'docker' : 'docker.exe'
                    docker.withRegistry('https://registry.hub.docker.com', 'registryCredential') {
                        def dockerImage = docker.image("${DOCKER_IMAGE}")
                        dockerImage.push()
                    }
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh """
                    export KUBECONFIG=$KUBECONFIG
                    kubectl create ns nodejs-exp
                    kubectl apply -f ./deployment.yaml --namespace nodejs-exp --validate=false
                    """
                }
            }
        }
    }
}